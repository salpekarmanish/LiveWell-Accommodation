package com.livewell.communication.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long senderId;
    
    @Column(nullable = false)
    private String senderName;
    
    @Column(nullable = false)
    private Long receiverId;
    
    @Column(nullable = false)
    private String receiverName;
    
    @Column(nullable = false, length = 2000)
    private String content;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MessageType messageType = MessageType.TEXT;
    
    @Column(nullable = false)
    private Boolean isRead = false;
    
    private String attachmentUrl;
    
    private Long relatedPropertyId;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime sentAt;
    
    private LocalDateTime readAt;
}
